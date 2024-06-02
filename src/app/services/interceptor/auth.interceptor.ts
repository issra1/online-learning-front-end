import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {  
  const token  = sessionStorage.getItem('token');
  if(token) {
    const authReq = req.clone({
      setHeaders: {
       // 'Content-Type': 'application/json; charset=utf-8; multipart/form-data',
      //  Accept: 'application/json',
        Authorization: `Bearer ${token}`
}
    });
  return next(authReq);
} else {
  return next(req);
}
  };