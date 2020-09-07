import React from 'react';

function Form({ handleSubmit, categories, amountEl, categoryEl}) {
    return (
        <form className='header' onSubmit={handleSubmit}>
            <div className='form-group'>
            <label htmlFor='category'>
                Category:{' '}
            </label>
            <select 
                id='category' 
                ref={categoryEl}
            >
                {categories.map(category => {
                    return (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    )
                })}
            </select>
            </div>
            <div className='form-group'>
                <label htmlFor='amount'>
                    Number Of Questions: {' '}
                </label>
                <input 
                    type='number'
                    id='amount'
                    min='1'
                    step='1'
                    defaultValue={10}
                    ref={amountEl}
                />
            </div>
            <div className='form-group'>
                <button className='btn'>
                    Play
                </button>
            </div>
        </form>
    );
}

export default Form;