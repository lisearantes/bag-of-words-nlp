import React from 'react'
import { motion } from 'framer-motion'
import { useClassificar } from './useClassificar'
import UploadFiles from './UploadFiles'
import Processing from './Training'
import Classification from './Classification'
import HowItWorks from './HowItWorks'
import CreateVocabulary from './CreateVocabulary'
import Training from './Training'

const App: React.FC = () => {
  const {
    frase,
    setFrase,
    resultado,
    carregando,
    criarModelo,
    classificarFrase,
    handleFileUpload,
    modeloCriado,
    dadosTreinamento
  } = useClassificar()

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-gray-900 to-black flex flex-col items-center px-8 py-6'>
      {/* Cabeçalho */}
      <motion.div
        className='text-center text-white mb-8'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-4xl font-bold text-blue-400 drop-shadow-lg'>
          🔍 Analisador de Sentimentos
        </h1>
        <p className='text-gray-300 mt-2'>
          Faça upload dos dados e classifique frases em positivo ou negativo.
        </p>
      </motion.div>

      {/* Upload de Arquivos */}
      {!dadosTreinamento && (
        <motion.div
          className='w-full max-w-3xl mb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <UploadFiles
            handleFileUpload={handleFileUpload}
            criarModelo={criarModelo}
            carregando={carregando}
          />
        </motion.div>
      )}

      {/*  */}
      <div className='max-w-5xl w-full grid grid-cols-2 gap-6'>
        {dadosTreinamento && (
          <div className='space-y-4'>
            <CreateVocabulary dadosTreinamento={dadosTreinamento} />
            <Training dadosTreinamento={dadosTreinamento} />
            <HowItWorks />
          </div>
        )}

        {/* Classificação de Texto */}
        {modeloCriado && (
          <motion.div
            className='col-span-1 sm:col-span-2 lg:col-span-1 space-y-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className='p-2 bg-green-900 text-green-200 rounded-lg shadow-md text-center h-fit'>
              <h2 className='text-2xl font-bold'>🎉 Modelo pronto para uso!</h2>
              <p className='text-sm text-gray-300'>
                O modelo já pode ser utilizado para classificação de textos.
              </p>
            </div>
            <Classification
              frase={frase}
              setFrase={setFrase}
              classificarFrase={classificarFrase}
              carregando={carregando}
              resultado={resultado}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App
