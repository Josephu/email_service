ip="54.206.106.116"
node_env="development"

ssh -i ~/.ssh/key/efcsydney.pem ec2-user@${ip} 'export NODE_ENV=${node_env}; cd /opt/email_service; git checkout .;git pull --rebase;'
ssh -i ~/.ssh/key/efcsydney.pem ec2-user@${ip} 'export NODE_ENV=${node_env}; cd /opt/email_service; node -v; npm install; npm run build'
