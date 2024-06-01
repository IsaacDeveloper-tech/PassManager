export type Password = {
    id:number,
    name:string,
    password:string
}

// Temporalmente tenemos este array para guardar las contraseñas
// TODO: Las deberemos almacenar de otra forma más segura
let passwords:Password[] = [];

export function getPasswords():Password[]
{
    return passwords;
}

export function addPassword(newPass: Password):void
{
    passwords.push(newPass);
}

export function updatePassword(id:number, updatedPassword:string):void
{
    const index = passwords.findIndex(pass => pass.id === id);

    if(index !== -1)
    {
        passwords[index].password = updatedPassword;
    }
}

export function deletePassword(id:number):void
{
    passwords = passwords.filter(p => p.id !== id);
}

