export const Data = {
    "DATABASE_URL": "MY_DB_URL",
    "DATABASE_NAME": "MY_DB_NAME",
    "SECRET": "MY_SECRET"
};

// list all your required resources here
export const Resources: ResourceItems[] = [
    {
        dbCollectionName: 'user',
        path: 'users'
    }
];


interface ResourceItems {
    dbCollectionName: string;
    path: string;
}