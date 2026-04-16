import express, { Request, Response, Router } from 'express';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware';

interface Options {
  port: number;
  publicPath: string;
  routes: Router;
}
export class Server {
  private app = express();
  private port: number;
  private publicPath: string;
  private routes: Router;

  constructor (options: Options){
    const {port, publicPath, routes} = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }
  

  async start(){
    //!Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));
    
    //!Public folder
    this.app.use(express.static(this.publicPath));
    
    //!Routes
    this.app.use(this.routes);

    //! for React router paths
    this.app.use((req: Request, res: Response)=>{
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.use(errorMiddleware);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`);
    });
  }
  
}