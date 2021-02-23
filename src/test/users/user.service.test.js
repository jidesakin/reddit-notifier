const sinon = require('sinon')
const db = require('../../infrastructure/database')
const UserService = require('../../app/users/user.service');

describe('UserService', () => {

    afterAll(function () {
        sinon.restore();
    });

    describe('Create User', () => {
        let create
        beforeAll(() => {
            create = sinon.stub(db.User, 'create')
        })

        afterAll(() => {
            create.restore()
        })

        test('should create user', async (done) => {
            const payload = { firstName: "Babajide", lastName: "Owosakin", email: "johndoe@audibene.com", timeZone: "Europe/Berlin"}
            await UserService.create(payload)
            done()
            sinon.assert.calledWith(create, payload);
        })
    
        test('should not create user and throw error', async (done) => {
            const payload = { firstName: "Babajide", lastName: "Owosakin"}
            create.throws(new Error("bad input"))
            try {
                await UserService.create(payload)
            } catch (error) {
                expect(error).not.toBeUndefined()
            }
            done()
            sinon.assert.calledWith(create, payload);
        })
    })

    describe('Update User', () => {
        let update
        beforeAll(() => {
            update = sinon.stub(db.User, 'update')
        })

        afterAll(() => {
            update.restore()
        })

        test('should update user', async (done) => {
            const payload = { firstName: "Babajide", lastName: "Owosakin", email: "johndoe@audibene.com", timeZone: "Europe/Berlin"}
            await UserService.update(1, payload)
            done()
            sinon.assert.calledWith(update, payload);
        })
    
        test('should not update user and throw error', async (done) => {
            const payload = { firstName: "Babajide", email: null }
            update.throws(new Error("bad input"))
            try {
                await UserService.update(1, payload)
            } catch (error) {
                expect(error).not.toBeUndefined()
            }
            done()
            sinon.assert.calledWith(update, payload);
        })
    })
})