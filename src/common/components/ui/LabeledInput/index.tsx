import { InputHTMLAttributes, ReactElement, TextareaHTMLAttributes } from 'react';
import styles from './labeled-input.module.scss';
import cn from 'classnames';

type GenericProps = {
    label: string;
    registerInput: any;
    error?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
    GenericProps & {
        variant: 'textarea';
    };

type InputProps = InputHTMLAttributes<HTMLInputElement> &
    GenericProps & {
        variant?: 'input';
    };

type Props = TextareaProps | InputProps;

export const LabeledInput = ({
    label,
    variant = 'input',
    registerInput,
    error,
    ...props
}: Props): ReactElement => {
    const content = (): ReactElement => {
        switch (variant) {
            case 'input':
                return (
                    <input className={styles.input} {...registerInput} {...(props as InputProps)} />
                );
            case 'textarea':
                return (
                    <textarea
                        className={styles.textarea}
                        {...(props as TextareaProps)}
                        {...registerInput}
                    />
                );
        }
    };

    return (
        <label className={cn(styles.label, { [styles.errored]: error })}>
            {label}

            {content()}

            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
};
