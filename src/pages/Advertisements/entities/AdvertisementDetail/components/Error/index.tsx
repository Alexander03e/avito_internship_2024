import { Button } from 'common/components/ui';
import styles from './ad-error.module.scss';
import { useNavigate } from 'react-router-dom';

export const AdError = () => {
    const navigate = useNavigate();

    const redirectToMain = () => {
        navigate('/');
    };

    return (
        <div className={styles.fetchError}>
            <span>Не удалось загрузить объявление</span>
            <Button onClick={redirectToMain} label='Вернуться на главную' variant='empty' />
        </div>
    );
};
