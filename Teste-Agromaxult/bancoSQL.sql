create database agromax;

use agromax;

create table patrimonios(
	id int primary key auto_increment,
    descricao varchar(45),
    valor decimal,
    tipo varchar(45),
    revisao date,
    estado varchar(45)
);

create table financeiro(
	id int primary key auto_increment,
    descricao varchar(45),
    valor decimal,
    tipo varchar(45),
    categoria varchar(65)
);

drop table financeiro;

create user 'guilherme'@'localhost' identified with mysql_native_password by 'senha';

grant all on agromax.* to 'guilherme'@'localhost';

select * from patrimonios;

#Permissão de users

create user 'agromax'@'localhost' identified by 'Abcd&123';
set password for agromax@'localhost'= 'Agromax2023';
rename user 'agromax' to 'Agromax'; -- n executei 


select User, host from mysql.user;
show grants for agromax@'localhost';

drop table patrimonios
