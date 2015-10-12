require 'fileutils'

Vagrant.require_version ">= 1.6.0"

# Copy sample cloud config so that we do not commit new discovery tokens
CLOUD_CONFIG_PATH_SAMPLE = File.join(File.dirname(__FILE__), "cloud-config.sample")
CLOUD_CONFIG_PATH = File.join(File.dirname(__FILE__), "cloud-config")
FileUtils.cp(CLOUD_CONFIG_PATH_SAMPLE, CLOUD_CONFIG_PATH)

# config options
$num_instances = 1
$instance_name_prefix = "2048"
$update_channel = "stable"
$image_version = "current"
$vm_gui = false
$vm_memory = 1024
$vm_cpus = 1
$forwarded_ports = {
    8080 => 8080
}
# Used to fetch a new discovery token for a cluster of size $num_instances
if File.exists?(CLOUD_CONFIG_PATH) && ARGV[0].eql?('up')
  require 'open-uri'
  require 'yaml'

  $new_discovery_url="https://discovery.etcd.io/new?size=#{$num_instances}"
  token = open($new_discovery_url).read

  data = YAML.load(IO.readlines(CLOUD_CONFIG_PATH)[1..-1].join)

  if data.key? 'coreos' and data['coreos'].key? 'etcd2'
    data['coreos']['etcd2']['discovery'] = token
  end

  # Fix for YAML.load() converting reboot-strategy from 'off' to `false`
  if data.key? 'coreos' and data['coreos'].key? 'update' and data['coreos']['update'].key? 'reboot-strategy'
    if data['coreos']['update']['reboot-strategy'] == false
      data['coreos']['update']['reboot-strategy'] = 'off'
    end
  end

  yaml = YAML.dump(data)
  File.open(CLOUD_CONFIG_PATH, 'w') { |file| file.write("#cloud-config\n\n#{yaml}") }
end

# Use old vb_xxx config variables when set
def vm_gui
  $vb_gui.nil? ? $vm_gui : $vb_gui
end

def vm_memory
  $vb_memory.nil? ? $vm_memory : $vb_memory
end

def vm_cpus
  $vb_cpus.nil? ? $vm_cpus : $vb_cpus
end

Vagrant.configure("2") do |config|
  # always use Vagrants insecure key
  config.ssh.insert_key = false

  config.vm.box = "coreos-%s" % $update_channel
  if $image_version != "current"
      config.vm.box_version = $image_version
  end
  config.vm.box_url = "http://%s.release.core-os.net/amd64-usr/%s/coreos_production_vagrant.json" % [$update_channel, $image_version]

  config.vm.provider :virtualbox do |v|
    # On VirtualBox, we don't have guest additions or a functional vboxsf
    # in CoreOS, so tell Vagrant that so it can be smarter.
    v.check_guest_additions = false
    v.functional_vboxsf     = false
  end

  # plugin conflict
  if Vagrant.has_plugin?("vagrant-vbguest") then
    config.vbguest.auto_update = false
  end

  (1..$num_instances).each do |i|
    config.vm.define vm_name = "%s-%02d" % [$instance_name_prefix, i] do |config|
      config.vm.hostname = vm_name

      if $expose_docker_tcp
        config.vm.network "forwarded_port", guest: 2375, host: ($expose_docker_tcp + i - 1), auto_correct: true
      end

      $forwarded_ports.each do |guest, host|
        config.vm.network "forwarded_port", guest: guest, host: host, auto_correct: true
      end

      config.vm.provider :virtualbox do |vb|
        vb.gui = vm_gui
        vb.memory = vm_memory
        vb.cpus = vm_cpus
      end

      ip = "172.17.8.#{i+100}"
      config.vm.network :private_network, ip: ip
      config.vm.synced_folder ".", "/home/core/share", id: "core", :nfs => true, :mount_options => ['nolock,vers=3,udp']

      if File.exist?(CLOUD_CONFIG_PATH)
        config.vm.provision :file, :source => "#{CLOUD_CONFIG_PATH}", :destination => "/tmp/vagrantfile-user-data"
        config.vm.provision :shell, :inline => "mv /tmp/vagrantfile-user-data /var/lib/coreos-vagrant/", :privileged => true
      end

    end
  end
end
