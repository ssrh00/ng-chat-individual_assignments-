## My Informantion

* Name : Qistina Maisarah binti Emril Faizal
* Student ID : 2025479656
* Group : CS270 3C
* Lecturer : Muhammad Atif bin Ramlan

## Project Title

Build a Realtime Chat Application with Angular 20 and Supabase

## Project Background

This project is developed as part of the Individual Lab Assignment. The purpose of this project is to build a real-time chat application using Angular 20 as the frontend framework and Supabase as the backend service. The project follows a tutorial from FreeCodeCamp titled “How to Build a Realtime Chat Application with Angular 20 and Supabase”.

The main objective of this project is to help students understand how a frontend framework can work together with a backend service to create a complete web application. In this project, Supabase is used to manage user authentication, database storage, and real-time data updates, while Angular is used to design the user interface and handle the main application logic.

## Discussion

This lab activity focuses on developing a real-time chat application using Angular 20 as the frontend framework and Supabase as the backend service. The main objective of this lab is to help students understand how frontend framework can be connected to a backend service to create a working web application. In this lab, I followed the tutorial provided by the lecture which is from FreeCodeCamp titled “ How to Build a Realtime Chat Application with Angular 20 and Supabase “ and completed the required tasks step by step.

The first step of the lab was creating a new Angular project using the Angular Command Line Interface (CLI). This helped me understand the basic structure of an Angular application, such as how components, services and configuration files are organized. Angular uses a modular structure which makes the code easier to manage and understand. From this step, I learned how components control the user interface while services handle the main application logic.

One of the main challenges in this lab was setting up Supabase correctly  as this was my first time using Supabase. Supabase is used as the backend service for authentication, database management and real time data updates. At first, it was difficult to understand how Supabase works compared to other traditional backend systems. After exploring the Supabase dashboard, I learned how to create a project, set up database tables, manage authentication settings and obtain the API keys needed to connect the Angular application to Supabase.

Another challenge involved managing environment configuration in Angular. The Supabase URL and anonymous key needed to be stored in the environment configuration file. Initially, the application could not connect properly because the environment variables were not imported correctly. By fixing the path and checking the configuration, I learned the importance of setting environment files correctly when connecting the Angular application to Supabase.

While developing the chat feature, I learned how Supabase supports real-time functionality through database changes. This allows new chat messages to appear and deleted messages to be removed instantly without refreshing the page. This was one of the most important parts of the lab, as it helped me understand how real-time chat applications work. By listening to changes in the database, the application can automatically update the user interface when messages are added or deleted.

During development, I faced several TypeScript-related errors, such as missing return value in asynchronous function and type errors during complication. These errors helped me understand theTypeScript checks the code and prevents potential problems. For example, I learned that all asynchronous functions must return a value in all possible situations. Fixing these errors improved my understanding of async and await and helped me write cleaner and safer code.

Another issue encountered was dependency and version compatibility between Angular, TypeScript and Supabase libraries. At one point, the application failed to run because of conflict between library versions. By reinstalling packages and using stable versions, I learned the importance of proper dependency management. This experience improved my problem solving skills and showed me how small configuration issues can affect the whole application.

Authentication was also an important part of this lab. Supabase Authentication provides an easy way to manage user login and user sessions. Implementing authentication helped me understand how access control works in web applications and how user information is handled securely. Although the user interface is simple, the authentication system works correctly and meets the ab requirements. This is because the focus of this lab is on the functionality rather than the design. The important part is that the real-time chat features work as expected and meet the objectives of the tutorial. The interface can be improved in future by just adding better layout and styling to enhance the user experience.

In conclusion, this lab provided useful hands-on experience in building a real time web application using Angular 20 and Supabase. Through this lab, I gained a new better understanding of fronted and backend integration, real time data handling, authentication and common development issues. The knowledge gained from this lab will be helpful for future projects involving modern web application development.



<!-- ## Database Table Schema -->
## users table

* id (uuid)
* full_name (text)
* avatar_url (text)

## Creating a users table

```sql
CREATE TABLE public.users (
   id uuid not null references auth.users on delete cascade,
   full_name text NULL,
   avatar_url text NULL,
   primary key (id)
);
```

## Enable Row Level Security

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

## Permit Users Access Their Profile

```sql
CREATE POLICY "Permit Users to Access Their Profile"
  ON public.users
  FOR SELECT
  USING ( auth.uid() = id );
```

## Permit Users to Update Their Profile

```sql
CREATE POLICY "Permit Users to Update Their Profile"
  ON public.users
  FOR UPDATE
  USING ( auth.uid() = id );
```

## Supabase Functions

```sql
CREATE
OR REPLACE FUNCTION public.user_profile() RETURNS TRIGGER AS $$ BEGIN INSERT INTO public.users (id, full_name,avatar_url)
VALUES
  (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name'::TEXT,
    NEW.raw_user_meta_data ->> 'avatar_url'::TEXT,
  );
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Supabase Trigger

```sql
  CREATE TRIGGER
  create_user_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.user_profile();
```

## Chat_Messages table (Real Time)

* id (uuid)
* Created At (date)
* text (text)
* editable (boolean)
* sender (uuid)
