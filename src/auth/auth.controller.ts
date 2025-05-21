import { Body, Controller, Post } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}
    @Post('signup')
    signUp(@Body() dto:CreateAuthDto){
        return this.authService.signUp(dto)
    }
}