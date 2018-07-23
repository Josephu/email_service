# Email Delivery Service Architecture

## Overview

The app provides an API endpoint that can send 1 email at a time.

## Hosting Environment

The service is hosted on AWS EC2. The redis service is a docker container running on the EC2 instance through docker-compose.

## Design Choice

Redis is used to queue the payload of each API call, and sent at a later stage. This provides buffer for huge amount of requests as well as retry mechanism in case the providers is not available.

The limitation for this design is that there is no way to track email status.

## Other details

Documentation: Swagger is used for easy communication and testing.
Monitoring: Currently all auditing is through logs on local server. To see the health of the system, you will have to log onto the server.
