<template>
  <q-page class="q-pa-lg contact-page">
    <div class="q-mx-auto" style="max-width: 980px">
      <div class="text-h5 q-mb-sm">Contacto</div>
      <div class="text-body1 q-mb-lg">
        ¿Tienes alguna pregunta, sugerencia o necesitas ayuda con tu pedido? Escríbenos mediante el
        formulario y te responderemos lo antes posible. También puedes llamarnos o escribir por WhatsApp.
      </div>

      <q-card flat bordered>
        <q-card-section>
          <q-form @submit.prevent="onSubmit" @reset.prevent="onReset" ref="formRef">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input v-model="form.fullName" label="Nombre y apellidos" :rules="[req]" dense filled />
              </div>
              <div class="col-12 col-sm-6">
                <q-input v-model="form.email" type="email" label="Correo electrónico" :rules="[req, isEmail]" dense filled />
              </div>
              <div class="col-12 col-sm-6">
                <q-input v-model="form.phone" type="tel" label="Teléfono" dense filled />
              </div>
              <div class="col-12 col-sm-6">
                <q-input v-model="form.subject" label="Asunto" :rules="[req]" dense filled />
              </div>
              <div class="col-12">
                <q-input v-model="form.message" type="textarea" autogrow label="Mensaje" :rules="[reqMin]" dense filled />
              </div>
            </div>

            <div class="row justify-between items-center q-gmt-md">
              <div class="text-grey-8">
                <q-icon name="call" class="q-mr-xs" /> +53 5 000 0000
                <span class="q-mx-sm">•</span>
                <q-icon name="mail" class="q-mr-xs" /> soporte@mercadotexas.cu
              </div>
              <div class="row q-gutter-sm">

                <q-btn type="reset" flat color="primary" label="Limpiar" :disable="loading" />
                <q-btn type="submit" color="primary" unelevated :loading="loading" label="Enviar" icon="send" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

// Número de WhatsApp al que se enviará el mensaje (solo dígitos, formato internacional)
const WHATSAPP_NUMBER = '14328882324';

const formRef = ref();
const loading = ref(false);

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

function req(v: string) { return !!v || 'Requerido'; }
function isEmail(v: string) {
  if (!v) return 'Requerido';
  const ok = /.+@.+\..+/.test(v);
  return ok || 'Correo inválido';
}
function reqMin(v: string) {
  if (!v) return 'Requerido';
  return v.trim().length >= 10 || 'Mínimo 10 caracteres';
}

async function onSubmit() {
  const valid = await formRef.value?.validate?.();
  if (!valid) return;
  try {
    loading.value = true;

    // Construir el mensaje para WhatsApp
    const lines: string[] = [];
    if (form.subject) lines.push(`Asunto: ${form.subject}`);
    if (form.message) lines.push(`Mensaje: ${form.message}`);
    const sender = [form.fullName || null, form.email || null, form.phone || null]
      .filter(Boolean)
      .join(' | ');
    if (sender) lines.push(`Enviado por: ${sender}`);
    const text = encodeURIComponent(lines.join('\n'));

    // Abrir WhatsApp con el mensaje preparado
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank');
    $q.notify({ type: 'positive', message: 'Abriendo WhatsApp para enviar tu mensaje…' });
    onReset();
  } catch {
    $q.notify({ type: 'negative', message: 'No se pudo preparar el envío por WhatsApp. Intenta nuevamente.' });
  } finally {
    loading.value = false;
  }
}

function onReset() {
  form.fullName = '';
  form.email = '';
  form.phone = '';
  form.subject = '';
  form.message = '';
}
</script>

<style scoped>
/* Ensure two-column layout on >= sm is handled by Quasar grid classes */
.contact-page{
  max-width: 100%;
  padding: 0 16px;

}
.contact-page::before{
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(to bottom right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.25)),
    url('/images/fondo2.JPG') center/cover no-repeat fixed;
  filter: blur(8px);
  z-index: 0;
}
</style>
