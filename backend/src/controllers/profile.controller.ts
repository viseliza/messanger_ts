import {
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Body,
	Delete,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import {
	Prisma,
	Profile,
	Profile as ProfileModel
} from '@prisma/client';

@Controller()
export class ProfileController {
	constructor(
		private readonly profileService: ProfileService,
	) { }

	@Get('/profile/:user_id')
	async get(@Param('user_id') user_id: string) {
		const id = Number(user_id);
		return this.profileService.findMessages({ user_id: id });
	}

	@Get('/profileByLogin/:login')
	async getByLogin(@Param('login') login: string) {
		return await this.profileService.getByLogin(login);
	}

	@Get('/profiles/:user_id')
	async findProfile(@Param('user_id') user_id: number) {
		return await this.profileService.findProfile({ user_id });
	}

	@Post('/profile/auth')
	create(
		@Body()
		data: Prisma.ProfileCreateInput,
	): Promise<Profile> | null {
		return this.profileService.create(data);
	}

	@Patch('/profile/:user_id')
	update(
		@Param('user_id') user_id: string,
		@Body() updateLinkDto: Prisma.ProfileUpdateInput,
	) {
		return this.profileService.update({
			where: { user_id: Number(user_id) },
			data: updateLinkDto,
		});
	}

	@Delete('/profile_delete/:user_id')
	delete(@Param('user_id') user_id: number) {
		return this.profileService.delete({ user_id });
	}
}