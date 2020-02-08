from setuptools import find_packages, setup

setup(
    name='SummarEase',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
        'flask-restful',
        'dnspython',
        'flask-cors',
        'nltk',
        'flask-mongoengine',
        'flask-bcrypt',
        'python-dotenv',
        'flask-jwt-extended'
    ],
)