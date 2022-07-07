- Name : text
- Name_salt : char(6) 
- Roll number : char(8)
- Branch : char(2)
- Year : char(2)
- course : char(1)
- roll : char(3)
- hostel : char(3)
- Mobile Number : char(10)
- password_store_schema : boolean (true for aes, false for bcrypt)
- password : text

create table if not exists users (
    name text,
    name_salt char(6),
    roll_number char(8) not null unique,
    branch char(2) not null,
    year char(2) not null,
    course char(1) not null,
    roll char(3) not null,
    mobile_number char(10),
    password_store_schema boolean not null,
    password text not null,
    primary key(roll_number),
    unique(name, name_salt)
); 

create index branch_index on users(branch);
create index year_index on users(year);
create index course_index on users(course);
create index roll_index on users(roll);
create index roll_number_index on users(roll_number));

ALTER TABLE users
ADD COLUMN hostel data_type char(2);

<!-- make sure all char are always upper for roll_number -->
<!-- infrequent writes and the db is small so have many indexes -->



no debouncing will be implemented => instead we will just send request with limit
