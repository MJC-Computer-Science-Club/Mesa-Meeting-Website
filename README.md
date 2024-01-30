
# Mesa Meeting Website

A website for Mesa memebers at MJC to organize times to  meet up and study together!


## Setup

This project using [**Django**](https://www.djangoproject.com/) for the backend, and [**React**](https://react.dev/) for the frontend. **Django** is a framework built on Python and **React** is a framework built on Javascript.

To start, first clone the repo into a directory of your choice and navigate your command line to that directory, then it's highly recommended to use a **Python Virtual Environment** to do so make sure you have Python installed, to check if you have Python installed you can run in a command line

`python --version`

If you get an output similar to
 
 `Python 3.12.1`

 then you have Python installed, if not you can download Python from [here](https://www.python.org/downloads/).

 Next to make a virtual environment in your current directory run this command 
 
 `python -m venv .`

then to activate your virtual environent on windows run
`Script\activate`.

Next you'll need to get the Python libraries installed using **pip**

To make sure you have **pip** installed run

`pip --version`

if you get an output similar to 

`pip 23.2.1 from C:\Python312\Lib\site-packages\pip (python 3.12)`

then it's installed, if not go [here](https://pip.pypa.io/en/stable/cli/pip_download/) to install **pip**.

**Django** is now configured properly! Now we need **React** to be properly setup, first navigate your command line into `src/frontend`

Make sure you have **npm** installed by running

`npm --version`

and like before you should see

`10.2.4`

If you don't please download **npm** from [here](https://nodejs.org/en/download/).

Next run 

`npm install`

and all the dependencies used for the frontend should automatically install.

Setup should now be complete!
## Running

To run the website navigate your terminal to the `src` folder and run this command

`python manage.py runserver`

and it now in your browser if you navigate to 127.0.0.1:8000 the website should be open!