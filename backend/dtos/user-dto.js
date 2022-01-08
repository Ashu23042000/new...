class UserDto {
    id;
    name;

    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.profession = user.profession;
        this.level = user.level;
    }
}


module.exports = UserDto;