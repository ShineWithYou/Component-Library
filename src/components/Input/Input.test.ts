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
    })
})