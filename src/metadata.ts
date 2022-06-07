import 'reflect-metadata';

function Injectable(key: string) {
    return (target: Function) => {
        Reflect.defineMetadata('a', 1, target);
        const meta = Reflect.getMetadata('a', target);
        console.log('Meta', meta)
    }
}


function Prop(target: Object, name: string) {

}

@Injectable("C")
export class C {
    @Prop prop: number;
}
