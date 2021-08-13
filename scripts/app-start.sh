#!/bin/bash
pm2 kill
pm2 start npm --name "img-sharing-mini-project-server" -- run "start:live"