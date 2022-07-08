const { UserModel } = require('../../src/infrastructure/database');
const user = require('../../src/application/user');


describe('createUser', () => {
    it('Valid User', async () => {
        UserModel.prototype.save = jest.fn().mockImplementation(() => ({
            id: 1,
        }));

        expect(await user.createUser({
            id: 1,
            password: '123Jão',
            email: 'jao@email.com',
            name: 'João Silva',
        })).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
            }),
        );
    });
});
describe('editUser', () => {
    it('Valid edit', async () => {
        UserModel.findOneAndUpdate = jest.fn().mockImplementation(() => ({
            exec: () => ({
                toObject: () => ({
                    id: 1,
                    password: '123Maria',
                    email: 'jao10@email.com',
                    name: 'Maria João',
                }),
            }),
        }));

        expect(await user.editUser({
            id: 1,
            password: '123Maria',
            email: 'jao10@email.com',
            name: 'Maria João',
        })).toEqual(
            expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
                password: expect.any(String),
                id: expect.any(Number),
            }),
        );
    });
});

describe('listUsers', () => {
    it('Valid list', async () => {
        UserModel.find = jest.fn().mockImplementation(() => ({
            exec: () => ({
                id: 1,
                email: 'cardozo10@email.com',
                name: 'André Cardozo',
                password: 'teste1234',
            }),
        }));

        expect(await user.listUsers({
            id: 1,
        })).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
            }),
        );

    });
});

describe('deleteUser', () => {
    it('Valid delete', async () => {
        UserModel.deleteOne = jest.fn().mockImplementation(() => ({
            exec: () => ({
                deletedCount: 1,
            }),
        }));

        expect(await user.deleteUser({
            id: 1,
            email: 'jao10@email.com',
        })).toEqual(1);
    });
});