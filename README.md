# team-mauve-sdi-project-3-repo

## Database Setup
to run the Docker command below you will need to add your container name, postgres password, and a volume. 
```bash
docker run -d \
#set your container name
--name YOUR_CONTAINER_NAME_HERE\

#set your password
-e POSTGRES_PASSWORD=YOUR_PASSWORD_HERE\

#create a volume and mounts it to your container
-v YOUR_VOLUME_NAME_HERE:/var/lib/postgresql/data \

#setting up the port map -> localhost:container
-p 5432:5432 \

#pulling the latest postgres image from docker. Can change to specific version.
postgres
```
Once the container is setup, access it using the command below
```bash
docker exec -it YOUR_CONTAINER_NAME_HERE psql -U postgres
```
After you've accessd the container, create your database.
```bash
CREATE DATABASE fitness;
```
In your /backend directory create a .env file

```bash
touch .env
```

Inside of that file create an environment variable named DATABASE_URL to specify your connection string to the postgres DB.

You will need to replace "YOUR_PASSWORD_HERE" with the password you created.
```bash
DATABASE_URL=postgresql://postgres:YOUr_PASSWORD_HERE@localhost:5432/fitness
```

With those steps completed, you should now be able to connect your express server to the postgres DB.

From your /backend directory run

```bash
node app.js
```
In your console you should see the line below confirming your server is running.
```bash
"Your Knex and Express app are running successfully"
```

