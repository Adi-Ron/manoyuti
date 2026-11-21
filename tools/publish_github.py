"""Create a private Adi-Ron/manoyuti repository and push without exposing credentials."""
import json
import os
import pathlib
import subprocess
import sys
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
OWNER = 'Adi-Ron'
REPO = 'manoyuti'


def main():
    env = dict(os.environ, GIT_TERMINAL_PROMPT='0', GCM_INTERACTIVE='Never')
    result = subprocess.run(['git', 'credential', 'fill'], input='protocol=https\nhost=github.com\n\n', capture_output=True, text=True, env=env, timeout=25, cwd=ROOT)
    credentials = dict(line.split('=', 1) for line in result.stdout.splitlines() if '=' in line)
    token = credentials.get('password')
    if not token:
        raise RuntimeError('Git sign-in is required for the requested owner.')

    def api(path, data=None):
        request = urllib.request.Request('https://api.github.com' + path, headers={'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json', 'User-Agent': 'Manoyuti-Deployment'}, data=json.dumps(data).encode() if data is not None else None)
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)

    login = api('/user')['login']
    organization = api(f'/users/{OWNER}')['type'] == 'Organization'
    if organization:
        membership = api(f'/user/memberships/orgs/{OWNER}')
        if membership.get('state') != 'active':
            raise RuntimeError('The authenticated account is not an active organization member.')
    elif login.lower() != OWNER.lower():
        raise RuntimeError('Refusing to publish under a different GitHub identity.')
    try:
        api(f'/repos/{OWNER}/{REPO}')
    except urllib.error.HTTPError as error:
        if error.code != 404:
            raise
        api(f'/orgs/{OWNER}/repos' if organization else '/user/repos', {'name': REPO, 'description': 'Manoyuti psychology practice website', 'private': True, 'auto_init': False})
    url = f'https://github.com/{OWNER}/{REPO}.git'
    remotes = subprocess.run(['git', 'remote'], cwd=ROOT, capture_output=True, text=True, check=True).stdout.splitlines()
    if 'adi-ron' not in remotes:
        subprocess.run(['git', 'remote', 'add', 'adi-ron', url], cwd=ROOT, check=True)
    elif subprocess.run(['git', 'remote', 'get-url', 'adi-ron'], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip() != url:
        raise RuntimeError('The adi-ron remote already points somewhere else.')
    subprocess.run(['git', '-c', f'credential.https://github.com.username={login}', 'push', 'adi-ron', 'HEAD:main'], cwd=ROOT, env=env, check=True)
    print(f'Published: https://github.com/{OWNER}/{REPO}')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(f'GitHub publication stopped: {type(error).__name__}. Check Adi-Ron organization access. No force push was attempted.', file=sys.stderr)
        sys.exit(1)
