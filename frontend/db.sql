create table users (
    id serial primary key,
    name text ,
    email text ,
    type text
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    description TEXT NOT NULL,
    skills TEXT NOT NULL,
    experience TEXT NOT NULL,
    location TEXT NOT NULL,
    salary TEXT,
    created_by text NOT NULL,
    foreign key (created_by) references users (id)
);

CREATE TABLE job_applications (
    id serial primary key,
    job_id text references jobs (id) on delete cascade,
    user_id text references users (id) on delete cascade
);


