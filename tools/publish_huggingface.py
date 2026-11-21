"""Publish the filtered app snapshot using an existing Hugging Face CLI sign-in."""
import json
import pathlib
import subprocess
import sys

from huggingface_hub import HfApi, get_token

ROOT = pathlib.Path(__file__).resolve().parents[1]


def main():
    if not get_token():
        raise RuntimeError('Sign in with hf auth login before deploying.')
    api = HfApi()
    owner = api.whoami()['name']
    repo_id = f'{owner}/manoyuti'
    # Parse dotenv without logging its contents or putting secret values in argv.
    config_file = ROOT / '.env.local'
    config = {}
    if config_file.exists():
        parsed = subprocess.run(['node', '-e', "process.stdout.write(JSON.stringify(require('node:util').parseEnv(require('node:fs').readFileSync('.env.local','utf8'))))"], cwd=ROOT, capture_output=True, text=True, check=True)
        config = json.loads(parsed.stdout)
    for name in ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'ADMIN_EMAIL']:
        if not config.get(name):
            raise RuntimeError(f'Missing local configuration: {name}')

    api.create_repo(repo_id, repo_type='space', space_sdk='docker', space_hardware='cpu-basic', private=False, exist_ok=True)
    info = api.space_info(repo_id)
    if info.sdk != 'docker':
        raise RuntimeError('Existing Space uses a different SDK; refusing to overwrite it.')
    site_url = f'https://{info.subdomain}.hf.space' if getattr(info, 'subdomain', None) else f'https://{owner.lower()}-manoyuti.hf.space'
    for name, value in {
        'NEXT_PUBLIC_SUPABASE_URL': config['NEXT_PUBLIC_SUPABASE_URL'],
        'NEXT_PUBLIC_SUPABASE_ANON_KEY': config['NEXT_PUBLIC_SUPABASE_ANON_KEY'],
        'NEXT_PUBLIC_SITE_URL': site_url,
        'NEXT_PUBLIC_SITE_NAME': 'Manoyuti',
    }.items():
        api.add_space_variable(repo_id, name, value)
    for name in ['SUPABASE_SERVICE_ROLE_KEY', 'ADMIN_EMAIL', 'RESEND_API_KEY', 'MAIL_FROM']:
        value = config.get(name, '').strip()
        if value and not value.startswith(('your-', 'placeholder', 'example')):
            api.add_space_secret(repo_id, name, value)
    api.upload_folder(
        repo_id=repo_id, repo_type='space', folder_path=ROOT,
        allow_patterns=['src/**', 'public/**', 'supabase/**', 'tests/**', 'Dockerfile', '.dockerignore', '.gitignore', '.env.example', 'README.md', 'package.json', 'package-lock.json', 'next.config.mjs', 'tsconfig.json', 'tailwind.config.ts', 'postcss.config.mjs'],
        ignore_patterns=['**/.env.local', '**/.env.admin.local', '**/*.log', '**/node_modules/**', '**/.next/**', 'artifacts/**'],
        commit_message='Deploy Manoyuti psychology website',
    )
    print(f'Space uploaded: https://huggingface.co/spaces/{repo_id}')
    print(f'Application: {site_url}')
    print('Build status must be checked before calling the deployment live.')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        # Upstream exceptions may include request payloads; never print them.
        print(f'Deployment stopped: {type(error).__name__}. Check account access, plan eligibility, and configuration.', file=sys.stderr)
        sys.exit(1)
