import React, { useEffect, useState } from 'react';
import { clientUrl } from '../../constants/client';
import { Category } from '../../models/Category';
import { Motto } from '../../models/Motto';
import { Role } from '../../models/Role';
import { MottoPurchaseBody } from '../../models/submodels/MottoPurchaseBody';
import { User } from '../../models/User';
import { categoryService } from '../../service/category.service';
import { loginService } from '../../service/login.service';
import { mottoService } from '../../service/motto.service';
import { mottoPurchaseService } from '../../service/mottopurchase.service';
import { userService } from '../../service/user.service';
import './MainPage.css';

const MainPage = (): JSX.Element => {

    const currentUser = loginService.currentUserValue;

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<{ createMottoButton: boolean }>({ createMottoButton: false });
    const [categories, setCategories] = useState<Category[]>([]);
    const [mottos, setMottos] = useState<Motto[]>([]);
    const [motto, setMotto] = useState<Motto>(new Motto(
        null,
        new Category(null, ''),
        new User(null, new Role(null, ''), '', '', '', null),
        '',
        null)
    );

    useEffect(() => {
        getAllCategories();
        getAllMottos();
    }, []);

    const getAllMottos = async (): Promise<void> => {
        const allMottos = await mottoService.getAllMottos();
        if (allMottos === null) {
            setErrorMessage('Error while getting all mottos');
            return;
        }
        setMottos(allMottos);
    }

    const getAllCategories = async (): Promise<void> => {
        const response: Category[] | null = await categoryService.getCategories();
        if (response === null) {
            setErrorMessage('Error while getting categories');
            return;
        }
        setCategories(response);
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'category') {
            let tmpMotto = motto;
            tmpMotto.categoryfk.id = Number(value);
            setMotto({ ...tmpMotto });
            return;
        }
        setMotto({ ...motto, [name]: value });
    }

    const createMotto = async (): Promise<void> => {
        setLoading({ createMottoButton: true });
        if (motto.motto.length < 1) {
            setErrorMessage('Motto is required');
        } else if (motto.categoryfk.id === null || motto.categoryfk.id === -1) {
            setErrorMessage('Category is required');
        } else if (motto.price === null) {
            setErrorMessage('Price is required');
        } else if (motto.price < 1 || (motto.price * 10) % 10 !== 0) {
            setErrorMessage('Price must be greater than 0 and can\'t be in decimal');
        }
        const savedMotto: Motto | null = await mottoService.createMotto(motto);
        if (savedMotto === null) {
            setErrorMessage('Error while creating motto');
        } else {
            setMottos(mottos => [...mottos, savedMotto]);
        }
        setLoading({ createMottoButton: false });
    }

    const purchaseHandler = async (mottoId: number, mottoIndex: number): Promise<void> => {
        setLoading({ createMottoButton: true });
        if (mottos[mottoIndex].ownerfk.id !== currentUser.id) {
            const mottoPurchaseBody = new MottoPurchaseBody(mottoId);
            const mottoPurchase = await mottoPurchaseService.purchaseMotto(mottoPurchaseBody);
            if (typeof mottoPurchase === 'string') {
                setErrorMessage(mottoPurchase);
            } else {
                userService.updateWallet(mottoPurchase.wallet);
                getAllMottos();
                setErrorMessage("");
            }
        } else {
            setErrorMessage("Can't purchase your own motto");
        }
        setLoading({ createMottoButton: false });
    }

    const navHandler = (url: string): void => {
        window.location.href = clientUrl + '/' + url;
    }


    return (
        <div>
            <h1>Hello {currentUser.username} CHF {currentUser.wallet} -{'>'}
                <small className='navText' onClick={() => loginService.logout()}> Logout</small>
                <small className='navBreak'> |</small>
                <small className='navText' onClick={() => navHandler('user-management')}> User-management</small>
                <small className='navBreak'> |</small>
                <small className='navText' onClick={() => navHandler('all-user-management')}> All-User-management</small>
            </h1>
            <div className='mottoContents'>
                <div className='mottoCreator'>
                    <div className='mottoCreatorInputs'>
                        <div className='mottoInputField'>
                            <label>Motto</label>
                            <input type='text' onChange={(event) => inputHandler(event)} name='motto' value={motto.motto} />
                        </div>
                        <div className='mottoInputField'>
                            <label>Category</label>
                            <select name='category' onChange={(event) => inputHandler(event)}>
                                <option value={-1}>Select category</option>
                                {
                                    categories.map((category, index) =>
                                        <option key={index} value={category.id || ''}>{category.category}</option>)
                                }
                            </select>
                        </div>
                        <div className='mottoInputField'>
                            <label>Price</label>
                            <input type='number' onChange={(event) => inputHandler(event)} name='price' value={motto.price || ''} />
                        </div>
                        {errorMessage &&
                            <div className='errorMessage'>{errorMessage}</div>
                        }
                        <button disabled={loading.createMottoButton} onClick={() => createMotto()}>Create Motto</button>
                    </div>
                </div>

                <div className='mottoDisplayer'>
                    <table className='mottoDisplayerTable'>
                        <thead>
                            <td>ID</td>
                            <td>Motto</td>
                            <td>Category</td>
                            <td>Owner</td>
                            <td>Price</td>
                            <td>Buy</td>
                        </thead>
                        <tbody>
                            {mottos.map((motto, index) =>
                                <tr key={index} className='motto'>
                                    <td>{motto.id}</td>
                                    <td>{motto.motto}</td>
                                    <td>{motto.categoryfk.category}</td>
                                    <td>{motto.ownerfk.username}</td>
                                    <td>{motto.price}</td>
                                    <td><button onClick={() => purchaseHandler(motto.id || -1, index)} disabled={loading.createMottoButton}>Buy</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
        </div>
    );

}

export default MainPage;