from django.shortcuts import render
import re
import os
import subprocess
import json
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

#
# This file contains code for returning version information through the api.
# This is useful for checking versions in production and has no effect on the actual app.
#


"""
Return package version as listed in `__version__` in `init.py`.
Credit: michel.iamit
"""
def get_version(package):
    init_py = open(os.path.join(package, '__init__.py')).read()
    return re.match("__version__ = ['\"]([^'\"]+)['\"]", init_py).group(1)


'''
Return current backend version and git commit information
Credit: Pranab
'''
class Version(APIView):
    def get(self, request, format=None):
        try:
            file_dir = os.path.dirname(os.path.abspath(__file__))
            git_command = ['git', 'log', '-1', '--pretty={"commit_hash": "%h", "full_commit_hash": "%H", "author_name": "%an", "commit_date": "%aD", "comment": "%s"}']
            git_identifier = subprocess.check_output(git_command, cwd=file_dir).decode('utf-8').strip()
            git_identifier = json.loads(git_identifier)
            return Response({
                "version": get_version('pitwallapi'),
                "git_commit": git_identifier
            }, status=200)
        except Exception as e:
            print(f"[Version Endpoint] Error: {e}")
            return Response(status=400)

