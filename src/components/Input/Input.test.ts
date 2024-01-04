import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe('Input', () => {
    it('basic', () => {
        const wrapper = mount(Input, {
            props: {
                size: 'small',
                type: 'text'
            },
            slots: {
                prepend: 'prepend',
                prefix: 'prefix'
            }
        })
        console.log(wrapper.html());

        expect(wrapper.classes()).toContain('zyt-input--small');
        expect(wrapper.classes()).toContain('is-prepend');

        // should render input
        expect(wrapper.find('input').exists()).toBeTruthy();
        expect(wrapper.get('input').attributes('type')).toBe('text');

        // slots
        expect(wrapper.find('.zyt-input__prepend').exists()).toBeTruthy();
        expect(wrapper.get('.zyt-input__prepend').text()).toBe('prepend');
        expect(wrapper.find('.zyt-input__prefix').exists()).toBeTruthy();
        expect(wrapper.get('.zyt-input__prefix').text()).toBe('prefix');

        // textarea
        const wrapper2 = mount(Input, {
            props: {
                type: 'textarea',
                modelValue: ''
            }
        });
        expect(wrapper2.find('textarea').exists()).toBeTruthy();
    })
    it('support v-model', async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: 'test',
                'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
                type: 'text'
            }
        })
        // 初始值
        const input = wrapper.get('input');
        console.log(input.element.value);
        expect(input.element.value).toBe('test');
        // 更新值
        await input.setValue('update');
        expect(wrapper.props('modelValue')).toBe('update');
        expect(input.element.value).toBe('update');
        expect(wrapper.emitted()).toHaveProperty('input');
        expect(wrapper.emitted()).toHaveProperty('change');
        const inputEvent = wrapper.emitted('input');
        const chnageEvent = wrapper.emitted('change');
        expect(inputEvent![0]).toEqual(['update']);
        expect(chnageEvent![0]).toEqual(['update']);
        // v-model 的异步更新
        await wrapper.setProps({ modelValue: 'prop update' });

    })
    it('support click to clear context', async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: 'test',
                clearable: true,
                type: 'text'
            },
            global: {
                stubs: ['Icon']
            }
        })
        // 不出现对应的 Icon 区域
        expect(wrapper.find('.zyt-input__clear').exists()).toBeFalsy();
        const input = wrapper.get('input');
        await input.trigger('focus');
        expect(wrapper.emitted()).toHaveProperty('focus');
        // 出现对应的 Icon 区域
        expect(wrapper.find('.zyt-input__clear').exists()).toBeTruthy();
        // 点击后值为空并且Icon消失
        await wrapper.get('.zyt-input__clear').trigger('click');
        expect(input.element.value).toBe('');
        // 点击值为空且消失，不仅仅出发 clear事件，会同时触发 input 和 change 事件
        expect(wrapper.emitted()).toHaveProperty('clear');
        expect(wrapper.emitted()).toHaveProperty('input');
        expect(wrapper.emitted()).toHaveProperty('change');
        const inputEvent = wrapper.emitted('input');
        const chnageEvent = wrapper.emitted('change');
        expect(inputEvent![0]).toEqual(['']);
        expect(chnageEvent![0]).toEqual(['']);

        await input.trigger('blur');
        expect(wrapper.emitted()).toHaveProperty('blur');
    })
    it('support switch password display',async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: '',
                showPassword: true,
                type: 'text'
            },
            global: {
                stubs: ['Icon']
            }
        })
        // 值为空，不出现对应的 Icon 区域
        expect(wrapper.find('.zyt-input__password').exists()).toBeFalsy();
        const input = wrapper.get('input');
        expect(input.element.type).toBe('password');
        // 出现 Icon 区域，并且 Icon 为密码图标
        await input.setValue('123');
        const eyeIcon = wrapper.find('.zyt-input__password');
        expect(eyeIcon.exists()).toBeTruthy();
        expect(eyeIcon.attributes('icon')).toBe('eye-slash');
        // 点击切换 Input 类型，并且 Icon 也会改变
        await eyeIcon.trigger('click');
        expect(input.element.type).toBe('text');
        expect(wrapper.find('.zyt-input__password').attributes('icon')).toBe('eye');
    })
})