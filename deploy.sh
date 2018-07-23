ip="13.236.179.166"
node_env="development"

ssh -i ~/.ssh/imagegospel.pem ubuntu@${ip} 'export NODE_ENV=${node_env}; cd /opt/email_service; git checkout .;git pull --rebase;'
ssh -i ~/.ssh/imagegospel.pem ubuntu@${ip} 'export NODE_ENV=${node_env}; source ~/.startup; cd /opt/email_service; npm install; npm run build'
