import app from "./app";

const server = app.listen(Number(process.env.PORT as string), ()=> {
  console.log('App running on port', Number(process.env.PORT as string));
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`Unhandled Rejection: ${err.name}, ${err.message}`);
  server.close(() => {
    console.error('Shutting Down! ...');
    process.exit(1);
  })
})