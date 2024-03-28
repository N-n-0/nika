import React from "react";
import { useEffect, useState, useRef } from "react";
import { handleSave, userClose,  handleSaveToCreateClass} from "@api/sc/agents/helper";

export const CreateMessageClassPopup = (
    setCreatePopup,
    setCreatePhraseTemplatePopup,
    setForm
) => {
    const messageSystemIdentifierRef = useRef<HTMLInputElement>(null);
    const messageRussianIdentifierRef = useRef<HTMLInputElement>(null);
    const messageWitAiRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messageSystemIdentifierRef.current!.value = "concept_message_about_";
        messageRussianIdentifierRef.current!.value = "Сообщение о ";
    }, [messageSystemIdentifierRef, messageRussianIdentifierRef])

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        setCreatePopup(false);
        setCreatePhraseTemplatePopup(true);
        setForm(messageSystemIdentifierRef.current?.value + "\n" + messageRussianIdentifierRef.current?.value + "\n" + messageWitAiRef.current?.value);
      };

    const closeClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
      await userClose();
      setCreatePopup(false);
    };

    const systemIdtfHandleKeyDown = (event) => {
        const inputValue = messageSystemIdentifierRef.current?.value;
        const fixedText = "concept_message_about_";

        if (inputValue === fixedText && (event.key === 'Backspace' || event.key === 'Delete')) {
        event.preventDefault();
        messageSystemIdentifierRef.current!.value = fixedText;
        }  
    }

    const russianIdtfHandleKeyDown = (event) => {
        const inputValue = messageRussianIdentifierRef.current?.value;
        const fixedText = "Сообщение о ";

        if (inputValue === fixedText && (event.key === 'Backspace' || event.key === 'Delete')) {
        event.preventDefault();
        messageRussianIdentifierRef.current!.value = fixedText;
        }  
    }

    return (
      <div className="popup">
        <h2>Создание сообщения и шаблонов ответов</h2>
        <button className='close_button' onClick={closeClick}>×</button>
        <div className='numdiv'>
            <p className='state-3'>1</p>
            <p className='state-4'>2</p>
        </div>
        <div className="form">
            <h4>Системный индетификатор</h4>
            <input
            type="text"
            className="input"
            ref={messageSystemIdentifierRef}
            onKeyDown={systemIdtfHandleKeyDown}
            />
            <h4>Индетификатор на русском языке</h4>
            <input
            type="text"
            className="input"
            ref={messageRussianIdentifierRef}
            onKeyDown={russianIdtfHandleKeyDown}
            />
            <h4>Название интента в Wit.ai</h4>
            <input
            type="text"
            className="input"
            ref={messageWitAiRef}
            placeholder='Ваш Wit.ai intent'
            />
            </div>
            <button className="button next" onClick={handleClick}>
            Далее
            </button>
        
      </div>
    );
  };

  export const CreatePhraseTemplatePopup = (
    setCreatePhraseTemplatePopup,
    form
  ) => {
    const phraseSystemIdentifierRef = useRef<HTMLInputElement>(null);
    const phraseRussianIdentifierRef = useRef<HTMLInputElement>(null);

    const [chipsValues, setChipsValues] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const handleChipAdd = (value: string) => {
        setChipsValues([...chipsValues, value]);
    };

    useEffect(() => {
        phraseSystemIdentifierRef.current!.value = "concept_phrase_template_";
        phraseRussianIdentifierRef.current!.value = "Шаблон фразы о ";
    }, [phraseSystemIdentifierRef, phraseRussianIdentifierRef])
    
    const handleChipDelete = (index: number) => {
      const newChipsValues = [...chipsValues];
      newChipsValues.splice(index, 1);
      setChipsValues(newChipsValues);
    };

    const handleChipEdit = (index) => {
        setEditingIndex(index);
      };
    
    const handleChipChange = (event, index) => {
      const updatedChipsValues = [...chipsValues];
      updatedChipsValues[index] = event.target.value;
      setChipsValues(updatedChipsValues);
    };

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        await handleSave(phraseSystemIdentifierRef, phraseRussianIdentifierRef,
            form, chipsValues);
        setCreatePhraseTemplatePopup(false);
      };

    const closeClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
      await userClose();
      setCreatePhraseTemplatePopup(false);
    };

    const systemIdtfHandleKeyDown = (event) => {
        const inputValue = phraseSystemIdentifierRef.current?.value;
        const fixedText = "concept_phrase_template_";

        if (inputValue === fixedText && (event.key === 'Backspace' || event.key === 'Delete')) {
        event.preventDefault();
        phraseSystemIdentifierRef.current!.value = fixedText;
        }  
    }

    const russianIdtfHandleKeyDown = (event) => {
        const inputValue = phraseRussianIdentifierRef.current?.value;
        const fixedText = "Шаблон фразы о ";

        if (inputValue === fixedText && (event.key === 'Backspace' || event.key === 'Delete')) {
        event.preventDefault();
        phraseRussianIdentifierRef.current!.value = fixedText;
        }  
    }

    return (
      <div className="popup">
        <h2>Создание сообщения и шаблонов ответов</h2>
        <button className='close_button' onClick={closeClick}>×</button>
        <div className='numdiv'>
            <p className='state-1'>1</p>
            <p className='state-2'>2</p>
        </div>
        <div className="form">
            <h4>Системный индетификатор</h4>
            <input
            type="text"
            className="input"
            ref={phraseSystemIdentifierRef}
            onKeyDown={systemIdtfHandleKeyDown}
            />
            <h4>Индетификатор на русском языке</h4>
            <input
            type="text"
            className="input"
            ref={phraseRussianIdentifierRef}
            onKeyDown={russianIdtfHandleKeyDown}
            />
            </div>
            <h2>Шаблоны ответов</h2>
            <div className="chips">
                <input
                    type="text"
                    className="chip-input"
                    placeholder="Шаблон фразы"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                        handleChipAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                        }
                    }}
                />
                {chipsValues.map((value, index) => (
                    <div className="chip-div" key={index}>
                    {editingIndex === index ? (
                        <input
                        type="text"
                        className="chip"
                        value={value}
                        onChange={(e) => handleChipChange(e, index)}
                        onBlur={() => setEditingIndex(null)}
                        autoFocus
                        />
                    ) : (
                        <div className="chip" onClick={() => handleChipEdit(index)}>
                        {value}
                        </div>
                    )}
                    <span className="chip-delete" onClick={() => handleChipDelete(index)}>
                      ×
                    </span>
                    </div>
                ))}
            </div>
            <button className="button save" onClick={handleClick}>
            Сохранить
            </button>
        
      </div>
    );
  };




  export const CreateClassPopup = (
    setCreateClassPopup
  ) => {
    const classSystemIdentifierRef = useRef<HTMLInputElement>(null);
    const classRussianIdentifierRef = useRef<HTMLInputElement>(null);
    const classNoteIdentifierRef = useRef<HTMLInputElement>(null);
    const classSuperClassIdentifierRef = useRef<HTMLInputElement>(null);

    const [chipsValues, setChipsValues] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const handleChipAdd = (value: string) => {
        setChipsValues([...chipsValues, value]);
    };

    useEffect(() => {
        classSystemIdentifierRef.current!.value = "concept_";
        classSuperClassIdentifierRef.current!.value = "concept_"
    }, [classSystemIdentifierRef, classSuperClassIdentifierRef])
    
    const handleChipDelete = (index: number) => {
      const newChipsValues = [...chipsValues];
      newChipsValues.splice(index, 1);
      setChipsValues(newChipsValues);
    };

    const handleChipEdit = (index) => {
        setEditingIndex(index);
      };
    
    const handleChipChange = (event, index) => {
      const updatedChipsValues = [...chipsValues];
      updatedChipsValues[index] = event.target.value;
      setChipsValues(updatedChipsValues);
    };

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        handleSaveToCreateClass(classSystemIdentifierRef, classRussianIdentifierRef, classNoteIdentifierRef, classSuperClassIdentifierRef, chipsValues);
        setCreateClassPopup(false);
      };

    const closeClick: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
      await userClose();
      setCreateClassPopup(false);  
    };

    const systemIdtfHandleKeyDown = (event) => {
        const inputValue = classSystemIdentifierRef.current?.value;
        const fixedText = "concept_";

        if (inputValue === fixedText   && (event.key === 'Backspace' || event.key === 'Delete')) {
        event.preventDefault();
        classSystemIdentifierRef.current!.value = fixedText;
        }  
    }

    return (
      <div className="popup">
        <h2>Создание классов</h2>
        <button className='close_button' onClick={closeClick}>×</button>
        <div className="form">
            <h4>Системный индетификатор</h4>
            <input
            type="text"
            className="input"
            ref={classSystemIdentifierRef}
            onKeyDown={systemIdtfHandleKeyDown}
            />
            <h4>Индетификатор на русском языке</h4>
            <input
            type="text"
            className="input"
            ref={classRussianIdentifierRef}
            placeholder="Название вашего класса"
            />
            <h4>Примечание</h4>
            <input
            type="text"
            className="input"
            ref={classNoteIdentifierRef}
            placeholder="Примечание(определение)"
            />
            <h4>Надкласс</h4>
            <input
            type="text"
            className="input"
            ref={classSuperClassIdentifierRef}
            placeholder="Надкласс для вашего класса"
            />
            </div>
            <h2>Декомпозиция</h2>
            <div className="chips">
                <input
                    type="text"
                    className="chip-input"
                    placeholder="Декомпозиция"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                        handleChipAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                        }
                    }}
                />
                {chipsValues.map((value, index) => (
                    <div className="chip-div" key={index}>
                    {editingIndex === index ? (
                        <input
                        type="text"
                        className="chip"
                        value={value}
                        onChange={(e) => handleChipChange(e, index)}
                        onBlur={() => setEditingIndex(null)}
                        autoFocus
                        />
                    ) : (
                        <div className="chip" onClick={() => handleChipEdit(index)}>
                        {value}
                        </div>
                    )}
                    <span className="chip-delete" onClick={() => handleChipDelete(index)}>
                      ×
                    </span>
                    </div>
                ))}
            </div>
            <button className="button save" onClick={handleClick}>
            Сохранить
            </button>
        
      </div>
    );
  };
