#test2
echo contenu du prompt : 
read content
echo couleur : 
read color 

case $color in 
red)
	codeCouleur="0;31"
;;
green)
	codeCouleur="0;32"
;;
blue)
	codeCouleur="0;34"
;;
*)
	echo couleur pas connue;
	codeCouleur="0;0";
esac

echo export PS1='"'"\e[${codeCouleur}m${content}\e[0m\n\$"'"' > C:/'Program Files'/git/etc/customization.sh

source C:/'Program Files'/git/etc/bash.bashrc

#ceci est un test de push gh
