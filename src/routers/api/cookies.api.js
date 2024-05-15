import { Router } from "express";

const cookiesRouter = Router()

cookiesRouter.get("/set" , (req, res, next) => {
    try {
        return res
            .cookie("online", "true", { maxAge: 60 * 60 * 1000})
            .json({ message: " la cookie anda "})
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/", (req, res, next) =>{
    try {
        const online = req.cookies.online
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/destroy/:cookie", (req, res, next) => {
    try {
      const { cookie } = req.params;
      return res
        .clearCookie(cookie)
        .json({ message: "cookie " + cookie + " borrada" });
    } catch (error) {
      return next(error);
    }
  });

cookiesRouter.get("/signed", (req, res, next) =>{
    try {
        return res.cookie("role", "admin", { signed: true}).json({ message: "cookie firmada con el rol de usuario"})
    } catch (error) {
        return next(error)
    }
})

cookiesRouter.get("/get-signed", (req, res, next) => {
    try {
      return res.json({ message: req.signedCookies });
    } catch (error) {
      return next(error);
    }
  });
  
export default cookiesRouter