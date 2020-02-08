# LH2020

We will use a microservice architecture to implement this application. Our main application will be divided into 3 primary services:

1. **Client**
2. **Server**
3. **Database**

## Project Directory
The root directory of the project is `/LH2020`. The codebase will be set up in the following directory structure:
```bash
/LH2020
├── server/
├── client/
└── venv/
```

- **`LH2020/server/`** : Directory which will hold the flask API. All NLP processing will be done inside the flask instance upon request from the frontend.
- **`LH2020/client/`** : Directory which will hold the ReactJS app. All user interactions will be done through here.

## Development Enviornment

### Setup
> It is best to create a virtual enviornment for development as it segrates our codebase dependencies from other projects that could be present on your development device. We will utilize `venv` for it. 
> #### Make sure that you have `python3` installed.

To setup virtual enviornment do the following:
1. Navigate to the top level directory of this repository. 
```bash
/LH2020
```
2. Create the python virtual enviornment by running the following command
```bash
$ python3 -m venv venv
```
3. Activate the virtual enviornment. You should see `(venv)` on your terminal before the current working directory.
```bash
$ . venv/bin/activate
```
4. The project has a `requirements.txt` file which lists all the dependencies needed by the flask API. Run the following command (in the root directory with activation of `venv`) to install all dependencies.
```bash
(venv) $ pip install -r requirements.txt
```
> **NOTE**: `(venv) $` signifies that this command be issues after activating the virtual enviornment.

5. The development enviornment has now been set up successfully. Once finished wth development youu can issue the following command to deactivate the virtual enviornment.
```bash
$ deactivate
```
> ### NOTE
> Alternatively there is a bash script which will handle all the development enviornemt=ent setup and installing the dependecies for you. YOu can run this script in yout terminal like this 
> ```bash
> $ ./setup
> ```
> You might need to give the file permissions to be executable. That can be accomplished by using the `chmod` command on a `bash` terminal
> ```bash
> $ chmod 775 setup
> ```

### Start Flask API
- Navigate to the root directory
- Activate `venv` and install all dependencies. (Could simply run the `setup` script)
- run the following command
```bash
$ python server/app.py
```
- Navigate to `http://localhost:5000/`