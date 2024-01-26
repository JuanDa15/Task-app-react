import { useState, type ChangeEvent, useEffect, useMemo } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useForm<T = any>(
  initialState: T,
  formValidations: any = undefined) {
  const [formState, setFormState] = useState<T>(initialState)
  const [formStatus, setFormStatus] = useState<any>({})
  const [formTouched, setFormTouched] = useState<any>({})

  useEffect(() => {
    (formValidations !== undefined) && checkValidators()
  }, [formState])

  useEffect(() => {
    setFormState(initialState)
  }, [initialState])

  const onInputChange = (
    { target }: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = target

    setFormTouched({
      ...formTouched,
      [`${name}Touched`]: true
    })

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const checkValidators = (): void => {
    const formCheckedValues: any = {}

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
    }

    setFormStatus(formCheckedValues)
  }

  const onResetForm = (): void => {
    setFormState(initialState)
  }

  const isValid = useMemo((): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    return Object.values<string | null>(formStatus).every((value: string | null) => value === null)
  }, [formState])

  const isTouched = useMemo((): boolean => {
    return Object.values<boolean>(formTouched).some((value: boolean) => value) ?? false
  }, [formState])

  return {
    ...formState,
    ...formStatus,
    ...formTouched,
    formState,
    onInputChange,
    onResetForm,
    isValid,
    isTouched
  }
}
