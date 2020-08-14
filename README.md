# CrossmarX API showcase project: Ionic-Angular 
**Date:** 28 July 2020

## Table of Contents
- [CrossmarX API showcase project: Ionic-Angular](#crossmarx-api-showcase-project-ionic-angular)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Project Status](#project-status)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Docker](#docker)
    - [Requirements](#requirements)
      - [Linux:](#linux)
      - [Windows:](#windows)
      - [Apple:](#apple)
    - [Usage](#usage-1)
  - [Support](#support)
  - [Authors and contributers](#authors-and-contributers)
  - [License](#license)
   
## Description
_For the extensive project documentation, contact the author above._

This application was created as part of a portfolio of showcase applications. These showcase applications each use a different frontend framework but connect through the CrossmarX API to the same backend application at CrossmarX.

Specifically, this project showcases a working mobile application that makes use of the CrossmarX API. Angular was the required framework for the project. Ionic was used to aid mobile development.

## Project Status
Development stage.

## Installation
>This project was created using Node.js 12.18.3 and npm 6.14.4.  
>Get nodejs and npm here: <https://nodejs.org/en/>

Use your prefered CLI and check which versions you have installed and if you have installed nodejs and npm correctly.

To check the version of node:
```bash
node -v
```
To check the version of npm:
```bash
npm -v
```

After installing nodejs and npm, move to the project's directory.
When you are in the root of the project directory, the packages from the file package.json will need to be installed:
```bash
npm install
```

## Usage
If you receive no errors, you can run the following command and the application should open in your default browser:
```bash
ionic serve -l
```

## Docker
It is also possible to run this project within a Docker container. First make sure Docker can run on your computer. If you have not used Docker before, you need to make sure you have a machine that meet the following requirements. For all official information, check the following pages: <https://docs.docker.com/desktop/>.

### Requirements
#### Linux:
* Docker Engine is supported on x86_64 (or amd64), armhf, and arm64 architectures.
* Ubuntu Focal 20.04 (LTS)
* Ubuntu Eoan 19.10
* Ubuntu Bionic 18.04 (LTS)
* Ubuntu Xenial 16.04 (LTS)

#### Windows:
* At least 4 GB of RAM.
* 64 bit processor with Second Level Address Translation (SLAT)
* BIOS-level hardware virtualization support must be enabled in the BIOS settings. For more information, see Virtualization.
* Hyper-V and Containers Windows features must be enabled.
* Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later).

#### Apple:
* At least 4 GB of RAM.
* Mac hardware must be 2010 or newer
* macOS must be version 10.13 or newer
* VirtualBox prior to version 4.3.30 must not be installed as it is not compatible with Docker Desktop.

### Usage
Start Docker Desktop. In the projects root directory, there is a DockerFile. Within your CLI of choice, move to the project's root directory and run the following commands:

**Build**
```bash
docker build -t cx_api_ionic_angular 
```
**Run**
```bash
docker run -p 8100:8100 -p 32729:32729 -d cx_api_ionic_angular
```

The webserver can then be accessed via the docker-machine ip and the chosen port. The docker-machine default ip is given by 192.168.99.100 and the port is 8100. Therefore in the default case the webserver can be accessed via the url http://192.168.99.100:8100.


## Support
You can contact the following CrossmarX employees in order for additional support.

| Name              | Email                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Mathijs Helderman | [m.helderman@crossmarx.nl](mailto:m.helderman@crossmarx.nl "Send an email to Mathijs Helderman") |
| Machiel Kruger    | [@crossmarx.nl](mailto:@crossmarx.nl "Send an email to Machiel Kruger")                          |
| Matthijs Lambooy  | [lambooy@crossmarx.nl](mailto:lambooy@crossmarx.nl "Send an email to Matthijs Lambooy")          |

## Authors and contributers
**Author:** Mathijs Helderman ([m.helderman@crossmarx.nl](mailto:m.helderman@crossmarx.nl "Send an email to Mathijs Helderman"))  
**Contributer:** Machiel Kruger ([@crossmarx.nl](mailto:@crossmarx.nl "Send an email to Machiel Kruger")) 

## License
© CrossmarX 2020.
