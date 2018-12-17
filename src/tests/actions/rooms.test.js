import {createRoom, startCreateRoom, removeRoom, editRoom, setTextFilter, saveDHTML} from '../../actions/rooms'; 


test('should return an object', () => {
    const action = createRoom({});
    expect(action).toEqual({
        type:'CREATE_ROOM',
        room:{}
    });
});

