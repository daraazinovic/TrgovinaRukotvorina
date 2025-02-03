-- Zamjeniti db_a98acf_edunovawp5 s imenom svoje baze

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab2677_trgovinarukotvorin SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab2677_trgovinarukotvorin COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab2677_trgovinarukotvorin SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO



create table proizvodi(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null,
izradujeseod varchar(50),
cijena int not null,
namjena varchar(50) not null 
);

create table vrste(
sifra int not null primary key identity(1,1),
sastav varchar(50)not null
);

create table materijali(
sifra int not null primary key identity(1,1),
naziv varchar(30)not null,
vrsta int not null references vrste(sifra)
);

create table sastavnice(
sifra int not null primary key identity(1,1),
proizvod int not null references proizvodi(sifra),
materijal int not null references materijali(sifra)
);




insert into proizvodi(naziv,izradujeseod,cijena,namjena)
values('Zahvalnice za svatove', 'vosak', 15, 'Zahvalnica za uzvanike svatova');

insert into proizvodi(naziv,izradujeseod,cijena,namjena)
values('Kuæica sa crkvom','beton',15,'Ukras za domove');

insert into proizvodi(naziv,izradujeseod,cijena,namjena)
values('Kapela sa mirisnom svijeæom','beton i svijeæa',10,'Ukras za razne prigode');

insert into proizvodi(naziv,izradujeseod,cijena,namjena)
values('Mini vaza','beton i umjetno cvijeæe',10,'Ukras za prigode i domove');

insert into proizvodi(naziv,izradujeseod,cijena,namjena)
values('Posudice za luèice', 'beton i luèica', 15, 'Ukras za dom')

insert into proizvodi(naziv,izradujeseod,cijena,namjena)
values('Figura bicikli', 'beton', 15, 'Ukras za dom')

insert into proizvodi(naziv,izradujeseod,cijena,namjena)
values('Set kuæice i vaze sa luèicom', 'beton,vosak i cvijeæe', 20,'Ukras za dom')



insert into vrste(sastav)
values('Drvo hrast');

insert into vrste(sastav)
values('Keramièki prah');

insert into vrste(sastav)
values('Vosak');

insert into vrste(sastav)
values('Umjetno cvijeæe');



insert into materijali(naziv,vrsta)
values('Lamele parketa',1);

insert into materijali(naziv,vrsta)
values('Keramièki beton', 2);

insert into materijali(naziv,vrsta)
values('Svijeæa',3);

insert into materijali(naziv,vrsta)
values('Cvijeæe',4);



insert into sastavnice(proizvod,materijal)
values(1,3);

insert into sastavnice(proizvod,materijal)
values(2,2);

insert into sastavnice(proizvod,materijal)
values(3,2);

insert into sastavnice(proizvod,materijal)
values(4,2);

insert into sastavnice(proizvod,materijal)
values(5,2);

insert into sastavnice(proizvod,materijal)
values(6,2);

insert into sastavnice(proizvod,materijal)
values(7,2);