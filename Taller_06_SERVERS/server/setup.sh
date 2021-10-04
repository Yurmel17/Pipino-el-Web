set -e
nginx -v

readonly DOMAIN=taller6.ddns.net
readonly CONFG_FILE_NAME=nginx.conf

sudo rm -rf /var/www/$DOMAIN/html
sudo mkdir -p /var/www/$DOMAIN/html
sudo chown -R $USER:$USER /var/www/$DOMAIN/html
sudo chown -R 755 /var/www/$DOMAIN

# copy all files from this repo to make them available for the server
sudo rm -rf /var/www/$DOMAIN/html/*
sudo cp -r ../ /var/www/$DOMAIN/html/

# copy server config
sudo cp ./$CONFG_FILE_NAME /etc/nginx/sites-available/$DOMAIN

# enable server block using a symlink
sudo rm -r /etc/nginx/sites-enabled/$DOMAIN
sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# test if everything was OK
sudo nginx -t

# restart nginx service
sudo systemctl restart nginx

# log info
echo "server set up successfully. Check the page at http://localhost:3333"
