class UserDto {
    id;
    name;

    constructor(user) {
        this.id = user._id;
        this.name = user.name;
    }
}


module.exports = UserDto;