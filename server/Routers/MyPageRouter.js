import express from "express";
import User from "../models/User.js"
import Product from "../models/Product.js";
import ProductImg from "../models/ProductImg.js";
import Favorite from "../models/Favorite.js";
import Comment from "../models/Comment.js";
import QnA from "../models/QnA.js";

const MyPageRouter = express.Router();

MyPageRouter.get("/product/:userId", async (req, res) => {
    const {userId} = req.params;
  const page = (req.query.page - 1) * 4;
  const data = await Product.findAll({
      include:[{
          model:User,
          required:true
        }, {
          model: ProductImg,
          attributes: ["imgUrl"],
          required: true
        }
      ],
      limit:4,
      offset:page,
    where : {seller : userId}
  });
  res.json(data);
});

MyPageRouter.get("/favorite/:userId", async (req, res) => {
    const {userId} = req.params;
    const page = (req.query.page - 1) * 4;
    const data = await Favorite.findAll({
        include:[{
            model:User,
            required:true,
            where : {idx : userId}
        }, {
            model: Product,
            attributes: ["title", "price"],
            required: true
        },{
            model:ProductImg,
            attributes: ["imgUrl"],
            required:true
        }
        ],
        limit:4,
        offset:page
    });
    res.json(data);
});

MyPageRouter.post("/img/:userId", async (req, res) => {
    const {userId} = req.param;
    await User.update(
        {img:req.body.img},
        {where:{idx:userId}}
        );
    res.send(req.body.img);
});

MyPageRouter.get("/profile/:userId", async (req, res) => {
    const {userId} = req.params;
    const data = await User.findOne({
        attributes:["img", "nickName", "rate"],
        where:{idx : userId}
    });
    res.send(data);
});

MyPageRouter.get("/num/:userId",
    async (req, res, next) => {
        const {userId} = req.params;
        const pNum = await Product.findAndCountAll({
            include: [{
                model: User,
                required: true,
                where: {idx: userId}
            }]
        });

        req.data = pNum.count;
        next();
    },
    async (req, res, next) => {
        const tmp = req.data;
        const {userId} = req.params;
        const fNum = await Favorite.findAndCountAll({
            include: [{
                model: User,
                required: true,
                where:{idx:userId}
            }]
        });

        req.data = [tmp, fNum.count];
        next();
    },
    async (req, res, next) => {
        const tmp = req.data;
        const {userId} = req.params;
        const cNum = await Comment.findAndCountAll({
            where : {receiver: 18}
        });
        res.json([tmp[0], tmp[1], cNum.count]);
    }
);

MyPageRouter.get("/comments/:userId", async (req, res) => {
   const {userId} = req.params;
   const data = await Comment.findAll({
       include : [{
           model : Product,
           required : true,
       }],
    where : {receiver : userId}
   });
   res.json(data);
});

MyPageRouter.delete("/withdraw/:userId", async (req, res) => {
    const {userId} = req.params;
    const data = await User.destroy({
        where : {idx : userId}
    });
    req.logout();
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.clearCookie("authCookie");
    });
    //res.redirect(process.env.CLIENT_URL_PORT);
});

export default MyPageRouter;