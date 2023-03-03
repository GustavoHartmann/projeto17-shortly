--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    "originalUrl" text NOT NULL,
    "shortenedUrl" text NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'bce5d008-454f-459f-89b0-b08db620eb15', 1, '2023-03-02 17:31:42.715274');
INSERT INTO public.sessions VALUES (2, '0d1cdf50-4973-4892-91a3-ae24200029e1', 2, '2023-03-02 17:33:31.755435');
INSERT INTO public.sessions VALUES (3, 'd4ecf4bf-87ef-4126-8c79-4aa276ea7441', 1, '2023-03-02 22:05:18.400123');
INSERT INTO public.sessions VALUES (4, 'f93f4fd5-67cb-4b9b-9159-2415526540a6', 2, '2023-03-02 22:08:39.557266');


--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortens VALUES (1, 'https://issoaquieumteste', 'Mb1u6tez', 0, 1, '2023-03-02 22:07:57.623644');
INSERT INTO public.shortens VALUES (2, 'https://issoaquieumteste', 'iFLqfhkk', 0, 2, '2023-03-02 22:08:56.729046');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$IU3Z6UclyPBKbf3BzI/IaOWV6NuZAK4rgzYb0Lh/PXVq9SseURPTa', '2023-03-02 14:07:33.734398');
INSERT INTO public.users VALUES (2, 'Guilherme', 'guilherme@driven.com.br', '$2b$10$rNphb8HLxvtt2phbjzQnM.ku.SkrhweG4K2nCrvjjP.3/BTRLtUdK', '2023-03-02 14:09:06.752195');
INSERT INTO public.users VALUES (3, 'Pedro', 'pedro@driven.com.br', '$2b$10$nQ6g28VVFAVPSbLCdvQRyeQ7m5/wOuvVezUAsfGBPQU8WfHBShpQm', '2023-03-02 14:11:51.75814');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortens_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortens shortens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

