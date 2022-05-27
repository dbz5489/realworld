# RealWorld

仓库地址https://github.com/dbz5489/realworld 成功部署地址：http://47.114.99.81:3389/

```sh
# 安装依赖
npm install

# 启动开发服务
npm run dev
```

服务器命令
连接
ssh root@47.114.99.81 Dbb758521
创建文件夹
mkdir realworld
上传文件
scp ./realworld.zip root@47.114.99.81:/root/realworld/
解压
unzip realworld.zip
删除
rm -f ./realworld
安装 node / pm2 / 配置相关路径
nver='v14.16.1' && ndir="node-${nver}-linux-x64" && nfile="${ndir}.tar.xz" && cd /usr/local && wget https://nodejs.org/dist/$nver/$nfile && tar xvf $nfile && mv $ndir nodejs && rm -rf $nfile && cd nodejs/bin && ln -sf `readlink -f node` /usr/bin/node && ln -sf `readlink -f npm` /usr/bin/npm && ln -sf `readlink -f npx` /usr/bin/npx && npm config set registry http://registry.npm.taobao.org && npm i pm2 -g && ln -sf `readlink -f pm2` /usr/bin/pm2 && cd
安装依赖
npm install
运行
npm run start  
然后用公网替代命令行的哪个网址+端口号去访问

<!-- PM2 -->

持续启用
pm2 start npm -- start
关闭
pm2 stop {id}
pm2 list
pm2 reload
pm2 restart

# 关闭内部防火墙

systemctl stop firewalld # 临时关
systemctl disable firewalld # 永久关. 重启以后也是关着的

# 开启内部防火墙

#systemctl start firewalld

# 添加开放端口规则

#firewall-cmd --zone=public --add-port=22/tcp --permanent
#firewall-cmd --zone=public --add-port=80/tcp --permanent
#firewall-cmd --zone=public --add-port=443/tcp --permanent
#firewall-cmd --zone=public --add-port=1337/tcp --permanent
#firewall-cmd --zone=public --add-port=3000/tcp --permanent
#firewall-cmd --zone=public --add-port=3306/tcp --permanent
#firewall-cmd --zone=public --add-port=8080/tcp --permanent

# 重新加载规则. 使之立刻生效.

#firewall-cmd --reload

<!-- 自动化
 -->

git tag v0.1.0
git tag
git push origin v0.1.0
