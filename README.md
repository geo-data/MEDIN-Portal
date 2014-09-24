# Introduction

This software has been developed to create the
[MEDIN Portal](http://portal.oceannet.org) by the
[GeoData Institute](http://www.geodata.soton.ac.uk) on behalf of the
[MEDIN partnership](http://www.oceannet.org).

Feedback and input (including code) is welcome. Please email
geodata@soton.ac.uk

# Licence

Unless otherwise indicated by packaged third party code this software
is made available under the Reciprocal Public License (RPL) 1.5. 

You can obtain a full copy of the RPL from
http://opensource.org/licenses/rpl1.5.txt or geodata@soton.ac.uk

# Installation

The server-side software is written for Python 2.7 and is designed to
run on any WSGI or CGI compliant HTTP server. It is recommended that
it be run under CGI for development environments and a persistent WSGI
environment for production deployment (e.g. www.modwsgi.org).

## Getting started using Docker

[Docker](http://www.docker.io/) provides a Linux environment for applications to
run in containers.  Pre-built images for these containers are available and
provide the easiest way to install the application for production use.  For
example, running the following command will deploy the portal on port `8000`
under Apache using mod wsgi:

    docker run -p=8000:80 geodata/medin-portal:wsgi

Port `8000` can be reverse proxied to a public facing web server or
caching service.  Multiple instances of the container could also be
started on separate hosts and connected to a load balancing service.

Even if the docker is not used in production it can be used for
development.  The CGI docker container comes in handy here as the
application is loaded on each request, meaning that changes to the
source files are immediately visible in the application:

    docker run -p=8000:80 geodata/medin-portal:cgi

In either case the `Dockerfile`s generating these containers provide
the definitive version of the dependencies and configuration required
by the application and as such should be used as a recipe for
replicating the installation in other environments.  See
`docker/README.md` and the [Docker
Index](https://index.docker.io/u/geodata/medin-portal/) for further
details.

## Requirements

The Portal has a number of dependencies, including Python 2.7, GDAL, Mapnik, and
a number of Python modules.  The exact requirements are best obtained from the
Dockerfile (`docker/base/Dockerfile`)

The CGI script is `deploy/portal.cgi` and the WSGI application is
found in `deploy/portal.wsgi`. Your web server should be configured
appropriately to invoke the required script.

In addition, the 'python' directory must be added to the HTTP server's
`PYTHONPATH` location so that the calling python process can locate
the application's modules.

Likewise the contents of the `html` directory should be made available
at the web server's root web location.

## Configuration

The application is configured by setting the `PORTAL_ROOT` environment
variable to the absolute filesystem path of the package's root
directory.

Genetic portal configuration is done by copying the
`etc/portal.ini.example` file to `etc/portal.ini` and editing the
contents as required.

Specific configuration of the portal spatial services is done by
editing the files in the templates/config directory.

Additionally, the online
[EPSG Geodetic Parameter Database](http://epsg-registry.org) should be
updated by running the `bin/epsg-update.py` script when required
(e.g. on a daily basis as a cron job):

    PYTHONPATH=./python python ./bin/epsg-update.py ./data/epsg-registry.sqlite

The above command assumes the script is run from the root distribution
directory: the `PYTHONPATH` variable provides access to the required
packages provided by the distribution.

The vocabulary cache should be updated in a similar way using
`bin/vocab-update.py`. This script uses a newline separated text file
as input to define a number of both local file-based and online
vocabularies. These vocabularies are then cached in a SQLite database
specified as a command line argument along the following lines:

    PYTHONPATH=./python python ./bin/vocab-update.py \
    --vocabularies ./data/vocabularies/vocab-list.txt \
    ./data/vocabularies.sqlite
