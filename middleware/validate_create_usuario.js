const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const ALLOWED_ROLES = new Set(['admin', 'cliente']);
const ALLOWED_FIELDS = new Set(['nombre', 'direccion', 'telefono', 'email', 'password', 'rol']);
const PASSWORD_MIN_LENGTH = Number(process.env.PASSWORD_MIN_LENGTH || 4);

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

module.exports = function validateCreateUsuario(req, res, next) {
  const errors = [];
  const body = req.body || {};

  const unknownFields = Object.keys(body).filter((field) => !ALLOWED_FIELDS.has(field));
  if (unknownFields.length > 0) {
    errors.push({
      field: 'body',
      message: `Campos no permitidos: ${unknownFields.join(', ')}`
    });
  }

  const nombre = isString(body.nombre) ? body.nombre.trim() : '';
  const direccion = isString(body.direccion) ? body.direccion.trim() : '';
  const telefono = isString(body.telefono) ? body.telefono.trim() : '';
  const email = isString(body.email) ? body.email.trim().toLowerCase() : '';
  const password = isString(body.password) ? body.password : '';
  const rol = isString(body.rol) ? body.rol.trim().toLowerCase() : undefined;

  if (!nombre) {
    errors.push({ field: 'nombre', message: 'nombre es requerido' });
  } else if (nombre.length < 3 || nombre.length > 100) {
    errors.push({ field: 'nombre', message: 'nombre debe tener entre 3 y 100 caracteres' });
  }

  if (!direccion) {
    errors.push({ field: 'direccion', message: 'direccion es requerida' });
  } else if (direccion.length < 8 || direccion.length > 200) {
    errors.push({ field: 'direccion', message: 'direccion debe tener entre 8 y 200 caracteres' });
  }

  if (!telefono) {
    errors.push({ field: 'telefono', message: 'telefono es requerido' });
  } else if (!PHONE_REGEX.test(telefono)) {
    errors.push({ field: 'telefono', message: 'telefono debe contener exactamente 10 digitos' });
  }

  if (!email) {
    errors.push({ field: 'email', message: 'email es requerido' });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'email no tiene un formato valido' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'password es requerido' });
  } else if (password.length < PASSWORD_MIN_LENGTH || password.length > 255) {
    errors.push({
      field: 'password',
      message: `password debe tener entre ${PASSWORD_MIN_LENGTH} y 255 caracteres`
    });
  }

  if (rol && !ALLOWED_ROLES.has(rol)) {
    errors.push({ field: 'rol', message: 'rol debe ser admin o cliente' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      ok: false,
      message: 'Errores de validacion',
      errors
    });
  }

  req.body.nombre = nombre;
  req.body.direccion = direccion;
  req.body.telefono = telefono;
  req.body.email = email;
  req.body.password = password;
  req.body.rol = rol || 'cliente';

  return next();
};
