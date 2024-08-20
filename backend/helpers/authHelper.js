import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.log(error);
    }
}

const comparePassword = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}

export { hashPassword, comparePassword };