import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback, Keyboard, Platform, Switch } from 'react-native';
import TimeInput from './app/components/TimeInput';

export default function App() {
  const [titleText, setTitleText] = useState("Horas de Stress");
  const [horaEntrada, setHoraEntrada] = useState('');
  const [minutoEntrada, setMinutoEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [minutoSaida, setMinutoSaida] = useState('');
  const [almocoPadrao] = useState('01:00');
  const [totalHoras, setTotalHoras] = useState<string | null>(null);
  const [horasExtrasAlmoco, setHorasExtrasAlmoco] = useState(false);
  const [minutosExtrasAlmoco, setMinutosExtrasAlmoco] = useState('0');

  const calcular = () => {
    const almocoPadraoArray = almocoPadrao?.split(':');

    const horaEntradaMinutos = (parseInt(horaEntrada, 10) || 0) * 60 + (parseInt(minutoEntrada, 10) || 0);
    const horaSaidaMinutos = (parseInt(horaSaida, 10) || 0) * 60 + (parseInt(minutoSaida, 10) || 0);
    const almocoPadraoMinutos = parseInt(almocoPadraoArray[0], 10) * 60 + parseInt(almocoPadraoArray[1], 10);

    let totalMinutos = horaSaidaMinutos - horaEntradaMinutos;

    if (horasExtrasAlmoco) {
      totalMinutos -= almocoPadraoMinutos + (parseInt(minutosExtrasAlmoco, 10) || 0);
    } else {
      totalMinutos -= almocoPadraoMinutos;
    }

    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;

    return `${horas}:${minutos < 10 ? '0' : ''}${minutos}`;
  };

  useEffect(() => {
    if (horaEntrada && minutoEntrada && horaSaida && minutoSaida) {
      setTotalHoras(calcular());
    } else {
      setTotalHoras(null);
    }
  }, [horaEntrada, minutoEntrada, horaSaida, minutoSaida, horasExtrasAlmoco, minutosExtrasAlmoco]);

  // Função para permitir apenas a entrada de números
  const handleNumericInput = (input: string) => input.replace(/[^0-9]/g, '');

  // Determinar o caminho do GIF a ser mostrado
  const getGifImage = () => {
    if (totalHoras) {
      const [horas, minutos] = totalHoras.split(':').map(Number);
      if (horas < 8 || (horas === 8 && minutos === 0)) {
        return require('../timerjob/app/assets/michael-party.gif');
      } else {
        return require('../timerjob/app/assets/michael-no.gif');
      }
    }
    return null; // ou algum valor padrão caso você queira
  };

  const imageSource = getGifImage();

  const dismissKeyboard = () => {
    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{titleText}</Text>
        <TimeInput
          placeholderHour='HH'
          placeholderMinute='MM'
          hour={horaEntrada}
          minute={minutoEntrada}
          onHourChange={(val) => setHoraEntrada(handleNumericInput(val))}
          onMinuteChange={(val) => setMinutoEntrada(handleNumericInput(val))}
        />
        <TimeInput
          placeholderHour='HH'
          placeholderMinute='MM'
          hour={horaSaida}
          minute={minutoSaida}
          onHourChange={(val) => setHoraSaida(handleNumericInput(val))}
          onMinuteChange={(val) => setMinutoSaida(handleNumericInput(val))}
        />
        <View style={styles.checkboxContainer}>
          <Switch
            value={horasExtrasAlmoco}
            onValueChange={(newValue) => setHorasExtrasAlmoco(newValue)}
          />
          <Text style={styles.checkboxLabel}>Tempo extra de almoço? (minutos)</Text>
          {horasExtrasAlmoco && (
            <TextInput
              style={styles.input}
              placeholder="Minutos extras"
              value={minutosExtrasAlmoco}
              onChangeText={(val) => setMinutosExtrasAlmoco(handleNumericInput(val))}
              keyboardType="numeric"
              maxLength={2}
            />
          )}
        </View>
        <Text style={styles.totalText}>{totalHoras ? `Horas de stress: ${totalHoras}` : ""}</Text>
        {imageSource && (
          <Image source={imageSource} style={styles.gifImage} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 24, // Define o tamanho da fonte para ser maior
    marginTop: 20,
    textAlign: 'center',
  },
  titleText: {
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bold',
  },
  gifImage: {
    width: 200,  // Ajuste conforme necessário
    height: 200, // Ajuste conforme necessário
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '15%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});
