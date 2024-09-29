import express, { Express, NextFunction, Request, Response } from 'express';
const app: Express = express();
import categoriesRouter from './routes/v1/categories.route'
import brandsRouter from './routes/v1/brands.route'
import { sendJsonErrors } from './helpers/responseHandler';
import createError from 'http-errors'

const PORT = process.env.PORT || 9000;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get('/', (req: Request, res: Response) => {
//   res.status(200).json({message: 'Express + TypeScript Server'});
// });
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/brands', brandsRouter)

// HANDLER ERROR
// Phải nằm sau phần khai báo routes
// Lỗi 404, những routes không tồn tại
app.use((req: Request, res: Response, next: NextFunction)=>{
  // Next chuyển tiếp
  next(createError(404));
})

// Báo lỗi dạng json
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const statusCode = err.status || 500;
  // res.status(statusCode).json({ statusCode: statusCode, message: err.message });
  sendJsonErrors(res, err)
});


export default app