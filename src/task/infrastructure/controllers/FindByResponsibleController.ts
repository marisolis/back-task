import { Request, Response } from "express";
import { FindByResponsibleUseCase } from "../../application/FindByResponsibleUseCase";
import { validationResult } from "express-validator";

export class FindByResponsibleController{
    constructor(
        private readonly findByResponsibleUseCase: FindByResponsibleUseCase
    ){}

    async run(req: Request, res: Response): Promise<Response>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: true,
                message:'Invalid input data'
            });
        }
        try{
            const {responsible, page, limit} = req.query;
            
            const responseTask = await this.findByResponsibleUseCase.run(String(responsible),Number(page),Number(limit));

            if(!responseTask){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found'
                });
            }
            
            if(responseTask.tasks.length === 0){
                return res.status(204).json({
                    error: false,
                    message: 'No tasks found to specified responsible'
                });
            }
            return res.status(200).json({
                error: false,
                message: 'Tasks found',
                data: responseTask
            });
        }catch(err){
            return res.status(500).json({
                error: true,
                message: 'Internal server error',
            });
        }
    }

}