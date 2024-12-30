async function generateHash(password, saltRounds = 10) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing the password: ' + error.message);
    }
}